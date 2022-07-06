import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
let EmployeeFormComponent = class EmployeeFormComponent {
    constructor(empService, toast) {
        this.empService = empService;
        this.toast = toast;
        this.isSlide = 'off';
    }
    ngOnInit() {
        this.empService.getDesignations().subscribe(data => {
            this.empService.listDesignation = data;
        });
    }
    submit(form) {
        this.empService.employeeData.isActive = form.value.isActive == true ? 1 : 0;
        this.empService.employeeData.isMarried = form.value.isActive == true ? 1 : 0;
        if (this.empService.employeeData.id == 0) {
            this.insertEmployee(form);
        }
        else {
            this.updateEmployee(form);
        }
    }
    insertEmployee(myFrom) {
        this.empService.saveEmployee().subscribe(data => {
            this.resetForm(myFrom);
            this.refreshData();
            this.toast.success('Success', 'Recored successfuly inserted');
        });
    }
    updateEmployee(myFrom) {
        this.empService.updateEmployee().subscribe(data => {
            this.resetForm(myFrom);
            this.refreshData();
            this.toast.warning('Success', 'Recored successfuly updated');
        });
    }
    resetForm(myForm) {
        myForm.form.reset(myForm.value);
        this.empService.employeeData = new Employee();
        this.hideShowSlide();
    }
    refreshData() {
        this.empService.getEmployees().subscribe(data => {
            this.empService.listEmployee = data;
        });
    }
    hideShowSlide() {
        if (this.checkBox.nativeElement.checked) {
            this.checkBox.nativeElement.checked = false;
            this.isSlide = 'off';
        }
        else {
            this.checkBox.nativeElement.checked = true;
            this.isSlide = 'on';
        }
    }
};
__decorate([
    ViewChild('checkbox1')
], EmployeeFormComponent.prototype, "checkBox", void 0);
EmployeeFormComponent = __decorate([
    Component({
        selector: 'app-employee-form',
        templateUrl: './employee-form.component.html',
        styleUrls: ['./employee-form.component.css']
    })
], EmployeeFormComponent);
export { EmployeeFormComponent };
//# sourceMappingURL=employee-form.component.js.map