import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../models/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  employees: Employee[] = [];
  searchCriteria: string = '';
  filteredEmployees: Employee[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchUsername: string = '';
  searchEmail: string = '';
  selectedEmployee: Employee| undefined;
  data: any[] = [];
  // config = {
  //   itemsPerPage: 10,
  //   currentPage: 1,
  //   totalItems: this.data.length
  // };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  // ngOnInit(): void {
  //   this.addDummyData(); // Panggil method untuk menambahkan data dummy
  // }

  // ngOnInit(): void {
  //   this.addDummyData(); // Panggil ini sebelum subscribe getEmployees
  //   this.employeeService.getEmployees().subscribe((employees) => {
  //     this.employees = employees;
  //     this.filterEmployees();
  //     this.totalItems = employees.length;
  //     console.log('Employees loaded:', employees);  // Logging data employees
  //   });
  // }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filterEmployees(this.searchCriteria);
      this.totalItems = this.employees.length;
      this.loadEmployees();

      console.log('Employees in Home:', this.employees);
    });
  }
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = this.employees.slice(0, this.itemsPerPage);
    });
  }
  onAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees];
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addEmployee(employee: Employee): void {
    try {
      this.employeeService.addEmployee(employee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

filterEmployees(criteria: string): void {
  this.filteredEmployees = this.employees.filter((employee: Employee) =>
    employee.username.includes(criteria) || employee.email.includes(criteria)
  );
}

onPageChange(page: number): void {
    this.currentPage = page;
    this.filterEmployees(this.searchCriteria);

  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.filterEmployees(this.searchCriteria);
    console.log('Items per page changed to:', this.itemsPerPage);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterEmployees(this.searchCriteria);
  }

  onEdit(employee: Employee): void {
    alert(`Edit employee: ${employee.username}`);
  }

  onDelete(employee: Employee): void {
    alert(`Delete employee: ${employee.username}`);
  }

  showDetail(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  updateFilteredEmployees(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredEmployees = this.employees.slice(start, end);
  }
}
