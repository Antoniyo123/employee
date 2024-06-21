import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../models/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  @ViewChild('employeeForm', { static: false }) employeeForm: NgForm | undefined; // Deklarasikan properti employeeForm

  employee: Employee = new Employee('', '', '', '', new Date(), 0, '', '', new Date());
  groups: string[] = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7', 'Group 8', 'Group 9', 'Group 10'];
  selectedGroup: string = '';
  groupSearch: string = '';
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}


  ngOnInit(): void {}
  onSave(): void {
    if (this.employeeForm && this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employee);
      this.router.navigate(['/home']);
    } else {
      console.log('Form is not valid or undefined.');
      alert('Please fill all mandatory fields correctly.');
    }
  }



  onCancel(): void {
    this.router.navigate(['/home']);
  }

  isValid(): boolean {
     return (
      this.employee.username.trim() !== '' &&
      this.employee.firstName.trim() !== '' &&
      this.employee.lastName.trim() !== '' &&
      this.validateEmail(this.employee.email) &&
      this.employee.birthDate instanceof Date &&
      !isNaN(this.employee.birthDate.getTime()) &&
      this.employee.birthDate <= new Date() &&
      !isNaN(this.employee.basicSalary) &&
      this.employee.status.trim() !== '' &&
      // this.selectedGroup.trim() !== '' &&
      this.employee.description instanceof Date &&
      !isNaN(this.employee.description.getTime())
    );
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(email.toLowerCase());
  }
}
