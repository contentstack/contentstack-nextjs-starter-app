import { Action } from "./action";

type Object = {
    title_h3: string;
    description: string;
  }
  
type Card = {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: Object;
  }
  
export type CardProps = {
    cards: [Card]
  }