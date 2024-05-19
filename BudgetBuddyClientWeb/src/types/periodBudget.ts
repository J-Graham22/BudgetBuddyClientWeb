export class PeriodBudget {
    Id: number;
    Name: string;
    StartDate: Date;
    EndDate: Date;

    constructor() {
        this.Id = -1;
        this.Name = '';
        this.StartDate = new Date();
        this.EndDate = new Date();
    }
}