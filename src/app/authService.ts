import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  constructor() {}
  getEmployees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  // getEmployees(): Observable<Employee[]> {
  //   return this.getEmployees.Observable();
  // }
  addEmployee(employee: Employee): void {
    const currentEmployees = this.getEmployees.value;
    const updatedEmployees = [...currentEmployees, employee];
    this.getEmployees.next(updatedEmployees);
}
  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      localStorage.setItem(this.tokenKey, 'dummy-token');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
}
