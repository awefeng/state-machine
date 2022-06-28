import { FSMConstructorProps, FSMTransitionsProps } from '../../types/fsm';
declare class FiniteStateMachine {
    private _transitions;
    private _state;
    private _history;
    constructor(props: FSMConstructorProps);
    /**
     * 获取状态机历史记录
     * @returns history
     */
    getHistory(): {
        from: string;
        to: string;
        event: string;
        type: "setState" | "transite";
    }[];
    /**
     * 获取当前状态
     * @returns state
     */
    getState(): string;
    /**
     * 获取当前状态下能进行转换的transitions
     * @returns transitions
     */
    getStateTransitions(): FSMTransitionsProps[];
    /**
     * 获取当前状态下，某一个event是否有transition
     * @param event 某一个事件名
     * @returns boolean
     */
    canTransite(event: string): boolean;
    /**
     * 设置当前状态
     * @param state
     */
    setState(state: string): void;
    /**
     * @param event 触发转换的事件名
     * @returns boolean, true意味着转换成功
     */
    transite(event?: string): void;
}
export default FiniteStateMachine;
