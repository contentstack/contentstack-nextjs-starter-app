import { Action,Image } from '../typescript/action';

type Object = {
    title_h2?: string;
    title_h3?: string;
    description?: string;
  }
  
export type Bucket = {
    title_h3: string;
    description: string;
    icon: Image;
    $: Object;
    url: string;
}

type BucketsList = {
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: Object;
  }

export type BucketProps = {
    title_h2: string;
    buckets:[BucketsList];
    $: Object;
  }