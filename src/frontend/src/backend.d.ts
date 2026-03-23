import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Enquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface CompanyInfo {
    name: string;
    description: string;
    email: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getCompanyInfo(): Promise<CompanyInfo>;
    getEnquiry(id: bigint): Promise<Enquiry>;
    submitEnquiry(name: string, email: string, phone: string, message: string): Promise<bigint>;
}
