'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var FiniteStateMachine = /** @class */ (function () {
    function FiniteStateMachine(props) {
        var state = props.state, transitions = props.transitions, onTransiteError = props.onTransiteError;
        this._history = [];
        this._transitions = transitions;
        this._state = state;
        this._onError = onTransiteError;
    }
    /**
     * 获取状态机历史记录
     * @returns history
     */
    FiniteStateMachine.prototype.getHistory = function () {
        return this._history;
    };
    /**
     * 获取当前状态
     * @returns state
     */
    FiniteStateMachine.prototype.getState = function () {
        return this._state;
    };
    /**
     * 获取当前状态下能进行转换的transitions
     * @returns transitions
     */
    FiniteStateMachine.prototype.getStateTransitions = function () {
        var _this = this;
        var targets = this._transitions.filter(function (trans) { return trans.from === _this._state; });
        return targets;
    };
    /**
     * 获取当前状态下，某一个event是否有transition
     * @param event 某一个事件名
     * @returns boolean
     */
    FiniteStateMachine.prototype.canTransite = function (event) {
        var _this = this;
        var targets = this._transitions.filter(function (trans) { return trans.from === _this._state; });
        return targets.some(function (trans) { return trans.event === event; });
    };
    /**
     * 直接设置当前状态 该方法不会触发回调函数
     * @param state
     */
    FiniteStateMachine.prototype.setState = function (state) {
        this._history.push({
            from: this._state,
            to: state,
            type: 'setState',
            event: ''
        });
        this._state = state;
    };
    /**
     * @param event 触发转换的事件名
     * @returns boolean, true意味着转换成功
     */
    FiniteStateMachine.prototype.transite = function (event) {
        var _this = this;
        var targets = this._transitions.filter(function (trans) { return trans.from === _this._state; });
        if (targets.length === 0) {
            console.error("Transition failed: There's no transition, which 'from' is current state '".concat(this._state, "'."));
            if (this._onError) {
                this._onError({ from: this._state, event: event });
            }
            return false;
        }
        var transition;
        if (!event) {
            if (targets.length === 1) {
                transition = targets[0];
            }
            else {
                console.error(
                // eslint-disable-next-line max-len
                "Transition failed: there's more than one transition begin with state '".concat(this._state, "', you should choose one, use 'event' as param."));
                if (this._onError) {
                    this._onError({ from: this._state, event: event });
                }
                return false;
            }
        }
        else {
            transition = targets.find(function (target) { return target.event === event; });
            if (!transition) {
                console.error(
                // eslint-disable-next-line max-len
                "Transition failed: there's no transition, which from '".concat(this._state, "', and event is '").concat(event, "', transition failed."));
                if (this._onError) {
                    this._onError({ from: this._state, event: event });
                }
                return false;
            }
        }
        if (typeof transition.beforeTransite === 'function') {
            transition.beforeTransite({
                from: transition.from,
                to: transition.to,
                event: transition.event
            });
        }
        this._state = transition.to;
        this._history.push({
            from: transition.from,
            to: transition.to,
            event: transition.event,
            type: 'transite'
        });
        if (typeof transition.action === 'function') {
            transition.action({
                from: transition.from,
                to: transition.to,
                event: transition.event
            });
        }
        if (typeof transition.afterTransite === 'function') {
            transition.afterTransite({
                from: transition.from,
                to: transition.to,
                event: transition.event
            });
        }
        return true;
    };
    return FiniteStateMachine;
}());

exports["default"] = FiniteStateMachine;
