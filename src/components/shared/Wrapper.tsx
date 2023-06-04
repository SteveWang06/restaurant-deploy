import clsx from 'clsx';
import React from 'react'

type WrapperProps = {
    children?:  React.ReactNode;
    className?: string;
}

const Wrapper = (props: WrapperProps) => {
  return (
    <div className={clsx('container mx-auto py-10', props.className)}>
        {props.children}
    </div>
  )
}

export default Wrapper