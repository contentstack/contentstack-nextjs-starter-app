import { Image, Action } from "../typescript/action";

type Object = {
    title: string;
    title_h2: string;
    title_h3: string;
    description: string;
    html_code: string;
    designation: string;
    name: string;
  }
  
type Buckets = {
    title_h3: string;
    description: string;
    call_to_action: Action;
    icon: Image;
    $: Object;
  }
  
export type BucketProps = {
    title_h2: string;
    description: string;
    buckets: [Buckets];
    $: Object;
  }

export type ObjectProps = {
    html_code_alignment: string;
    title: string;
    description: string;
    html_code: string;
    $: Object;
  }

export type SectionProps = {
    title_h2: String;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: Object;
  } 

export type Employee = {
    image: Image;
    name: string;
    designation: string;
    $: Object;
  }

export type TeamProps = {
    title_h2: string;
    description: string;
    $: Object;
    employees: [Employee];
  }