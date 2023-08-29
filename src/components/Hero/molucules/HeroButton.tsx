type HeroButtonProps = {
  url: string,
  cta_text: string
}

export const HeroButton = (props: HeroButtonProps): JSX.Element => {
  return <a href={props.url}>{props.cta_text}</a>
} 