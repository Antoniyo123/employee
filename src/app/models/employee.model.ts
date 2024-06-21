export class Employee {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthDate: Date,
    public basicSalary: number,
    public status: string,
    public group: string,
    public description: Date
  ) {}
}
