import React, { Component } from 'react';
import tt from 'counterpart';
import {
    formatDecimal,
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';

const SelectToken = props => {
    return (
        <div
            className="input-group"
            style={{ marginBottom: props.marginBottom }}
        >
            <input
                className="input-group-field"
                type="text"
                placeholder={tt('g.amount')}
                value={props.amount}
                ref="amount"
                autoComplete="off"
                onChange={props.amountChange}
            />
            <div className="pd-0 bg-x">
                <select>
                    {props.input_token_type.map((token_name, i) => {
                        return <option>{token_name}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default class SidebarSwap extends Component {
    constructor(props) {
        super(props);

        this.input_token_type = ['SCT', 'SCTM', 'KRWP', 'STEEM', 'SBD'];
        this.output_token_type = ['SCT', 'SCTM', 'KRWP', 'STEEM', 'SBD'];
        this.swap_fee = 1.0;

        this.state = {
            amount: 0,
            output_amount: 0,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.amountChange = this.amountChange.bind(this);
    }

    componentDidMount() {}

    amountChange(e) {
        const amount = e.target.value;
        console.log('-- PromotePost.amountChange -->', amount);
        /// update value
        var output_amount = amount * 2;
        this.setState({ amount, output_amount });
    }

    onSubmit(e) {
        console.log(e);
    }

    render() {
        const {
            amount,
            output_amount,
            loading,
            amountError,
            trxError,
        } = this.state;

        const { sct_to_steemp, steem_to_dollor, steem_to_krw } = this.props;
        const styleToken = { color: 'rgb(0, 120, 167)' };
        const krwp_to_steem =
            sct_to_steemp * 1000.0 / (sct_to_steemp * steem_to_krw);
        const krwp_to_sct = formatDecimal(
            1000.0 / (sct_to_steemp * steem_to_krw)
        );
        const steem_price = formatDecimal(steem_to_dollor);
        const sct_price = formatDecimal(sct_to_steemp * steem_to_dollor);
        const sct_price_with_krw = formatDecimal(sct_to_steemp * steem_to_krw);
        const locale = tt.getLocale();

        return (
            <div className="c-sidebar__module">
                <div className="c-sidebar__header" style={styleToken}>
                    <h3 className="c-sidebar__h3">Token Swap</h3>
                </div>
                <div className="c-sidebar__content">
                    <div className="swap-form">
                        <div className="swap-input">
                            {/* input component */}
                            <SelectToken
                                amount={amount}
                                amountChange={this.amountChange}
                                input_token_type={this.input_token_type}
                                marginBottom={0}
                            />

                            <div className="text-center">
                                {/* <Icon name="dropdown-arrow" /> */}
                                {'▼'}
                            </div>

                            <SelectToken
                                amount={output_amount}
                                amountChange={this.amountChange}
                                input_token_type={this.output_token_type}
                                marginBottom={10}
                            />
                        </div>
                        <div className="text-right">
                            <span
                                className="articles__icon-100"
                                title={`수수료는 ${this.swap_fee}%입니다.`}
                            >
                                <button className="button" disabled={true}>
                                    {'수수료 책정'}
                                </button>
                            </span>

                            <button type="button" className="button">
                                {'Swap'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
