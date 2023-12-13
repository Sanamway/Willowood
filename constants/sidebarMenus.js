import { AiOutlineHome } from "react-icons/ai";
import { BiUser, BiLogInCircle } from "react-icons/bi";
import { FcBusinessman } from "react-icons/fc";

 const menuItems = [
  { id: 1, label: "Home", icon: AiOutlineHome, link: "/" },
  
  { id: 1, label: "User Role Profile", icon: BiUser, link: "/table/table_user_profile" },
  { id: 2, label: "User Information", icon: BiUser, link: "/table/table_user_information" },
  { id: 2.1, label: "Assign Role Profile", icon: BiUser, link: "/table/table_assign_role" },
  { id: 2.2, label: "User Assign Business", icon: BiUser, link: "/table/table_user_assign_business" },
  { id: 2.3, label: "Company Information", icon: BiUser, link: "/table/table_company_info" },
  { id: 2.4, label: "Business  Segment", icon: BiUser, link: "/table/table_business_segment" },
  { id: 2.5, label: "Business Unit Division", icon: BiUser, link: "/table/table_business_unit_division" },
  { id: 2.6, label: "Zone", icon: BiUser, link: "/table/table_zone" },
  { id: 2.7, label: "Region", icon: BiUser, link: "/table/table_region" },
  { id: 2.8, label: "Territory", icon: BiUser, link: "/table/table_territory" },
  { id: 2.9, label: "District", icon: BiUser, link: "/table/table_district" },
  { id: 3.0, label: "Village", icon: BiUser, link: "/table/table_village" },
  { id: 2.9, label: "Farmer", icon: BiUser, link: "/table/table_farmer" },
  { id: 3.0, label: "Crop", icon: BiUser, link: "/table/table_crop" },
   { id: 3.1, label: "Depot/Warehouse", icon: BiUser, link: "/table/table_depot_warehouse" },
  { id: 3.2, label: "Map Depot Warehouse", icon: BiUser, link: "/table/table_map_depot" },
  { id: 3.3, label: "Product Category", icon: BiUser, link: "/table/table_product_category" },
  { id: 3.4, label: "Product Sement", icon: BiUser, link: "/table/table_product_segment" },
  { id: 3.5, label: "Product Brand", icon: BiUser, link: "/table/table_product_brand" },
  { id: 3.6, label: "Material SKU", icon: BiUser, link: "/table/table_material_sku" },
  { id: 3.7, label: "Rolling Plan", icon: BiUser, link: "/rollingplans" }, 
  { id: 3.7, label: "Dealer", icon: FcBusinessman, link: "/dealerform_details" },
  { id: 3.8, label: "Employee", icon: FcBusinessman, link: "/table/table_employee" },
  { id: 3.9, label: "Colletion Plan", icon: BiUser, link: "/collectionplans" },
  { id: 4.0, label: "Forgot", icon: BiUser, link: "/forgotpass" }
];

export default menuItems
