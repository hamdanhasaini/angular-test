import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

interface DynamicObject {
  [key: string]: any;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  sortField: string = '';
  sortDirection: string = 'asc';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = this.employees.slice();
    });
  }

  filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees.slice();
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        this.matchesSearchCriteria(employee, this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to the first page when searching
  }
  
  matchesSearchCriteria(employee: Employee, searchTerm: string): boolean {
    // Define the columns you want to search in
    const searchableColumns = ['username', 'email', 'firstName', 'lastName'];

    // Check if the search term exists in any of the searchable columns
    return searchableColumns.some(column =>
      (employee as DynamicObject)[column].toLowerCase().includes(searchTerm)
    );
  }

  

  sort(field: string) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    // Create a new sorted array instead of sorting in place
    this.filteredEmployees = [...this.filteredEmployees].sort((a, b) => {
      const valueA = (a as any)[this.sortField];
      const valueB = (b as any)[this.sortField];
  
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  
  

  get pagedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.filteredEmployees.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }
}
