webpackHotUpdate(0,{

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    display: flex;\n    align-items: center;\n    margin-bottom: 15px;\n    &:last-child{\n        margin-bottom: 0px;\n    }\n    p{\n        margin: 0;\n    }\n    & > div{\n        margin-left: auto;\n    }\n'], ['\n    display: flex;\n    align-items: center;\n    margin-bottom: 15px;\n    &:last-child{\n        margin-bottom: 0px;\n    }\n    p{\n        margin: 0;\n    }\n    & > div{\n        margin-left: auto;\n    }\n']);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _Button = __webpack_require__(77);

var _Button2 = _interopRequireDefault(_Button);

var _styledComponents = __webpack_require__(103);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Paper = __webpack_require__(62);

var _Paper2 = _interopRequireDefault(_Paper);

var _reactFlexboxGrid = __webpack_require__(104);

var _styles = __webpack_require__(38);

var _reactRedux = __webpack_require__(36);

var _redux = __webpack_require__(39);

var _Check = __webpack_require__(396);

var _Check2 = _interopRequireDefault(_Check);

var _axios = __webpack_require__(79);

var _axios2 = _interopRequireDefault(_axios);

var _index = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _jsx('div', {}, void 0, _jsx('p', {}, void 0, 'Trenutno nemate unesenih pitanja'), _jsx('p', {}, void 0, 'Da biste unijeli nova pitanja, idite na postavke'));

var ActivateQuestionList = function (_Component) {
    _inherits(ActivateQuestionList, _Component);

    function ActivateQuestionList(props) {
        _classCallCheck(this, ActivateQuestionList);

        var _this = _possibleConstructorReturn(this, (ActivateQuestionList.__proto__ || Object.getPrototypeOf(ActivateQuestionList)).call(this, props));

        _this.handleAction = function (index, item) {
            var _this$props = _this.props,
                changeActiveQuestion = _this$props.changeActiveQuestion,
                socket = _this$props.socket;


            socket.emit("activate", _extends({}, item));

            changeActiveQuestion(null);

            setTimeout(function () {
                changeActiveQuestion(index + 1);
            }, 5000);
        };

        _this.disableButtonFunction = function (index) {
            var activeQuestion = _this.props.activeQuestion;
            var buttonState = _this.state.buttonState;


            if (!buttonState && index != activeQuestion) return true;
            return false;
        };

        _this.state = {
            buttonState: false
        };
        return _this;
    }

    _createClass(ActivateQuestionList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                questions = _props.questions,
                currentDate = _props.currentDate,
                addQuestion = _props.addQuestion;

            console.info("QUESTIONS", questions);
            if (!questions.length) {
                var getForDate = currentDate.format('l');

                _axios2.default.get(document.location.origin + '/api/questions?filter[where][date]=' + getForDate).then(function (response) {
                    console.info("RESPONSE", response);
                    if (response.status == 200) {
                        addQuestion(response.data);
                    }
                }).catch(function (error) {
                    console.info("ERROR", error);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                classes = _props2.classes,
                questions = _props2.questions;


            return _jsx(_reactFlexboxGrid.Grid, {}, void 0, _jsx(_Paper2.default, {
                className: classes.root
            }, void 0, _jsx('div', {}, void 0, _jsx('ul', {
                style: style.ul
            }, void 0, questions && questions.length > 0 && questions.map(function (item, index) {
                var disabledButton = _this2.disableButtonFunction(index);
                console.info("INDEX", index);
                return _jsx(Li, {}, item.id, _jsx('p', {}, void 0, index + 1 + '. ' + item.rightAnswer), _jsx(_Button2.default, {
                    raised: true,
                    disabled: disabledButton,
                    color: 'primary',
                    className: classes.button,
                    onClick: function onClick() {
                        _this2.handleAction(index, item);
                    }
                }, void 0, _jsx(_Check2.default, {
                    className: classes.leftIcon
                }), 'Send'));
            }) || _ref))));
        }
    }]);

    return ActivateQuestionList;
}(_react.Component);

;

var Li = _styledComponents2.default.li(_templateObject);

var style = {
    li: {
        display: 'flex'
    },
    button: {
        marginLeft: 'auto'
    },
    ul: {
        padding: 0
    }
};

var styles = function styles(theme) {
    return {
        root: theme.mixins.gutters({
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: theme.spacing.unit * 3
        }),
        button: {
            marginLeft: 'auto'
        },
        leftIcon: {
            marginRight: theme.spacing.unit
        }
    };
};

var matchDispatchToProps = function matchDispatchToProps(dispatcher) {
    return (0, _redux.bindActionCreators)({
        addQuestion: _index.addQuestion,
        changeActiveQuestion: _index.changeActiveQuestion
    }, dispatcher);
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        questions: state.questions,
        currentDate: state.currentDate,
        activeQuestion: state.activeQuestion,
        socket: state.socket
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, matchDispatchToProps)((0, _styles.withStyles)(styles)(ActivateQuestionList));

/***/ })

})
//# sourceMappingURL=hot-update.js.map