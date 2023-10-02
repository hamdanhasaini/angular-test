import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'assets/employee.json';

  constructor(private http: HttpClient) { }

  getEmployees(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'username',
    sortOrder: string = 'asc',
    search: string = ''
  ): Observable<Employee[]> {
    // Create query parameters
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString())
      .set('_sort', sortBy)
      .set('_order', sortOrder);

    // Add search parameter if provided
    // if (search) {
    //   params = params.set('q', search);
    // }

    // Make the HTTP request with the query parameters
    return this.http.get<Employee[]>(this.apiUrl, { params });
  }
}
