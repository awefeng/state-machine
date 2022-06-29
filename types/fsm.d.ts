declare type ActionCallback = (transite: {
  from: string
  to: string
  event: string
}) => void

export declare type HistoryType = 'setState' | 'transite'

export interface FSMConstructorProps {
  state: string
  transitions: FSMTransitionsProps[]
  onTransiteError?: (transite: {
    from: string
    to?: string
    event?: string
  }) => void
}

export interface FSMTransitionsProps {
  event: string
  from: string
  to: string
  action?: ActionCallback
  beforeTransite?: ActionCallback
  afterTransite?: ActionCallback
}
