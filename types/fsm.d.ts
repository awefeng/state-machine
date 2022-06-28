declare type ActionCallback = (from: string, to: string, event: string) => void

export interface FSMConstructorProps {
  state: string
  transitions: FSMTransitionsProps[]
}

export interface FSMTransitionsProps {
  event: string
  from: string
  to: string
  action?: ActionCallback
  beforeAction?: ActionCallback
  afterAction?: ActionCallback
}
