import { OnInit, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatStepper } from '@angular/material';

export interface DryingMethod {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'warning-dialog',
    templateUrl: 'warning.dialog.html',
    styleUrls: ['warning.dialog.css']
})
export class WarningDialog {

    constructor(
        public dialogRef: MatDialogRef<WarningDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    Reject(): void {
        this.data.hasSucceded = false;
        this.dialogRef.close();
    }
}

export interface DialogData {
    dailyUsage: number;
    nightlyUsage: number;
    hasSucceded: boolean;
}

@Component({
    selector: 'form-component',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css'],
})
export class FormComponent implements OnInit {

    basic: FormGroup;
    additional: FormGroup;
    current: FormGroup;

    confirmed: boolean;

    dryingMethods: DryingMethod[] = [
        {
            value: "dryer",
            viewValue: "Używam suszarki bębnowej"
        },
        {
            value: "traditional",
            viewValue: "Suszę tradycyjnie",
        }
    ]

    constructor(private builder: FormBuilder, private dialog: MatDialog) {
        this.confirmed = false;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(WarningDialog, {
            width: '500px',
            data: {
                dailyUsage: this.current.get('dailyUsage').value,
                nightlyUsage: this.current.get('nightlyUsage').value,
                hasSucceded: true,
            },
        });
        dialogRef.afterClosed().subscribe(_ => {
            if (_) {
                this.confirmed = _;
            }
        });
    }

    next(stepper: MatStepper): void {
        stepper.next();
        this.confirmed = false;
    }

    calculate(): number {
        return this.basic.get("awaiting").value ? (this.additional.get("interval").value
            + (this.additional.get("dryingMethod").value === 'dryer' ?
                1 : this.additional.get("dryingTime").value)) * 20 :
            (this.additional.get("interval").value + (this.additional.get("dryingMethod").value === 'dryer' ? 1 : this.additional.get("dryingTime").value))
            * (this.current.get("dailyUsage").value + this.current.get("nightlyUsage").value);
    }

    calculateNight(): number {
        const result: number = this.calculate();
        return this.basic.get("awaiting").value ? 0.25 * result :
            (this.additional.get("interval").value + (this.additional.get("dryingMethod").value === 'dryer' ? 1 : this.additional.get("dryingTime").value)) * this.current.get("nightlyUsage").value
    }

    ngOnInit() {
        this.basic = this.builder.group({
            dayOfBirth: new FormControl({
                value: '',
            }),
            weight: new FormControl({
                value: '',
            }),
            awaiting: [false]
        });
        this.basic.get('awaiting').valueChanges.subscribe(_ => {
            const dayOfBirth = this.basic.get('dayOfBirth');
            dayOfBirth.disabled ? dayOfBirth.enable() : function () {
                dayOfBirth.reset();
                dayOfBirth.disable();
            }();
            const weight = this.basic.get('weight');
            weight.disabled ? weight.enable() : function () {
                weight.reset();
                weight.disable();
            }();
        });
        this.additional = this.builder.group({
            interval: new FormControl({
                value: [null, Validators.required],
            }),
            dryingMethod: new FormControl({
                value: [null, Validators.required],
            }),
            dryingTime: new FormControl({
                value: '',
            }),
        });
        this.current = this.builder.group({
            dailyUsage: new FormControl({
                value: [null, Validators.required],
            }),
            nightlyUsage: new FormControl({
                value: [null, Validators.required],
            }),
        });
    }
}