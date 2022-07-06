import { TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
describe('EmployeeDetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeDetailsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EmployeeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=employee-details.component.spec.js.map