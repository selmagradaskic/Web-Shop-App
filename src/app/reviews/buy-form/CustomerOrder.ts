export interface CustomerOrder {
    id: number;
	product: number;
    customerName: string;
    email: string;
	address: string;
	city: string;
	countryState: string;
	card: number;
	ex_month: string;
	ex_year: number;
	cvv: number;
    createdDate: Date;
    updatedDate: Date;
}