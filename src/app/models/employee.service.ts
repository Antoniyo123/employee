import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private readonly localStorageKey = 'employees';
  private storageKey = 'employees';
  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.employees));
  }


  constructor() {
    const storedEmployees = localStorage.getItem(this.storageKey);
  const initialEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];

  this.employeesSubject = new BehaviorSubject<Employee[]>(initialEmployees);

  }


  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }
  addEmployee(employee: Employee): void {
    const currentEmployees = this.employees.getValue();
    const updatedEmployees = [...currentEmployees, employee];
    this.employees.next(updatedEmployees);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedEmployees));
    console.log('Employees after add:', updatedEmployees);
  }
  addDummyEmployees(dummyEmployees: Employee[]): void {
    this.employees.next(dummyEmployees); // Pastikan Anda menggunakan next() untuk mengirim data baru
  }

}
