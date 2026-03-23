import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  // Types
  type CompanyInfo = {
    name : Text;
    description : Text;
    address : Text;
    email : Text;
    phone : Text;
  };

  type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  module Enquiry {
    public func compare(enquiry1 : Enquiry, enquiry2 : Enquiry) : Order.Order {
      Nat.compare(enquiry1.id, enquiry2.id);
    };
  };

  // Var persistent data
  var companyInfo : CompanyInfo = {
    name = "Nirprastha Export";
    description = "Exporter of goods.";
    address = "123 Business St, City, Country";
    email = "info@nirprasthaexport.com";
    phone = "+1234567890";
  };

  var nextEnquiryId = 0;
  let enquiries = Map.empty<Nat, Enquiry>();

  // Public methods
  public query ({ caller }) func getCompanyInfo() : async CompanyInfo {
    companyInfo;
  };

  public shared ({ caller }) func submitEnquiry(name : Text, email : Text, phone : Text, message : Text) : async Nat {
    let id = nextEnquiryId;
    let enquiry : Enquiry = {
      id;
      name;
      email;
      phone;
      message;
    };
    enquiries.add(id, enquiry);
    nextEnquiryId += 1;
    id;
  };

  public query ({ caller }) func getEnquiry(id : Nat) : async Enquiry {
    switch (enquiries.get(id)) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) { enquiry };
    };
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.values().toArray().sort();
  };
};
