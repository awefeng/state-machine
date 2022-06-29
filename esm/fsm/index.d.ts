import { FSMConstructorProps, FSMTransitionsProps, HistoryType } from '../../types/fsm';
declare class FiniteStateMachine {
    private _transitions;
    private _state;
    private _onError;
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
        type: HistoryType;
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
     * 直接设置当前状态 该方法不会触发回调函数
     * @param state
     */
    setState(state: string): void;
    /**
     * @param event 触发转换的事件名
     * @returns boolean, true意味着转换成功
     */
    transite(event?: string): boolean;
}
export default FiniteStateMachine;
