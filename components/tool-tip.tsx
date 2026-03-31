import React, { useRef, useEffect, MutableRefObject } from 'react';

type TooltipProps = {
  children?: JSX.Element|JSX.Element[];
  content: string;
  direction: string;
  status: number;
  delay: number;
  dynamic: boolean;
}

const Tooltip = (props: TooltipProps) => {
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef() as MutableRefObject <HTMLDivElement>;

  const showTip = () => {
    hideTimeoutRef.current = setTimeout(() => {
      toolTipRef.current.style.display = "block";
    }, props.delay || 400);
  };

  const hideTip = () => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    toolTipRef.current.style.display = "none";
  };

  useEffect(() => {
    if (props.dynamic) {
      props.status !== 0 && (toolTipRef.current.style.display = "block");
      hideTimeoutRef.current = setTimeout(() => {
        toolTipRef.current.style.display = "none";
      }, props.delay || 400);
    }
    return () => {
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [props.content, props.delay, props.dynamic, props.status]);

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      <div className={`Tooltip-Tip ${props.direction || 'top'}`} ref={toolTipRef}>
        {props.content}
      </div>
    </div>
  );
};

export default Tooltip;
