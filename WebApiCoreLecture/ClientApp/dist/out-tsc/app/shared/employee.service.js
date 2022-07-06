import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
let EmployeeService = class EmployeeService {
    constructor(myhttp) {
        this.myhttp = myhttp;
        this.employeeUrl = 'https://localhost:44344/api/Employee';
        this.designationUrl = 'https://localhost:44344/api/Designation';
        this.listEmployee = [];
        this.listDesignation = [];
        this.employeeData = new Employee();
    }
    saveEmployee() {
        return this.myhttp.post(this.employeeUrl, this.employeeData);
    }
    updateEmployee() {
        return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`, this.employeeData);
    }
    getEmployees() {
        return this.myhttp.get(this.employeeUrl);
    }
    getDesignations() {
        return this.myhttp.get(this.designationUrl);
    }
    deleteEmployee(id) {
        return this.myhttp.delete(`${this.employeeUrl}/${id}`);
    }
};
EmployeeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EmployeeService);
export { EmployeeService };
//# sourceMappingURL=employee.service.js.map