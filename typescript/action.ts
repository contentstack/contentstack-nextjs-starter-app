type Object = {
  url: string;
  title: {};
}

export type Action = {
    title: string;
    href: string;
    $: Object;
  }

export type Image = {
    filename: string;
    url: string;
    $: Object;
  }