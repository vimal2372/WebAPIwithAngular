import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
let EmployeeDetailsComponent = class EmployeeDetailsComponent {
    constructor(empService, datepipe, toast) {
        this.empService = empService;
        this.datepipe = datepipe;
        this.toast = toast;
    }
    ngOnInit() {
        this.empService.getEmployees().subscribe(data => {
            this.empService.listEmployee = data;
        });
    }
    populateEmployee(selectedEmployee) {
        let dateFormated = this.datepipe.transform(selectedEmployee.doj, 'yyyy-MM-dd');
        selectedEmployee.doj = dateFormated;
        console.log(selectedEmployee);
        this.empService.employeeData = selectedEmployee;
        if (this.emp.isSlide === 'off') {
            this.emp.hideShowSlide();
        }
    }
    delete(id) {
        if (confirm('Do you really want to delete this record?')) {
            this.empService.deleteEmployee(id).subscribe(data => {
                console.log('Record deleted.....');
                this.empService.getEmployees().subscribe(data => {
                    this.empService.listEmployee = data;
                    this.toast.error('Success', 'Recored successfuly deleted');
                });
            }, error => {
                console.log("Record not deleted");
            });
        }
    }
};
__decorate([
    ViewChild(EmployeeFormComponent)
], EmployeeDetailsComponent.prototype, "emp", void 0);
EmployeeDetailsComponent = __decorate([
    Component({
        selector: 'app-employee-details',
        templateUrl: './employee-details.component.html',
        styleUrls: ['./employee-details.component.css']
    })
], EmployeeDetailsComponent);
export { EmployeeDetailsComponent };
//# sourceMappingURL=employee-details.component.js.map