type Object = {
    title: string;
    body: string;
  }
  
  type Blog = {
    url: string;
    body: string;
    title: string;
    $: Object;
  }
  
export type BlogListProps = {
    blogs: [Blog];
  }