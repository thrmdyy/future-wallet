import { FC, memo, useCallback, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { tokens } from 'consts';
import { Icons } from 'assets';

import './InputToken.scss';

const CnInputToken = cn('inputToken');

interface IInputTokenProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    changeTokenHandler: (token: any) => void;
}

export const InputToken: FC<IInputTokenProps> = memo(
    ({ changeTokenHandler, ...props }) => {
        const [isDropdownShow, setIsDropdownShow] = useState(false);
        const [selectedToken, setSelectedToken] = useState(tokens[0]);

        useEffect(() => {
            changeTokenHandler(selectedToken);
        }, [selectedToken]);

        const isDropdownShowChangeCallback = useCallback(() => {
            setIsDropdownShow((prev) => !prev);
        }, []);

        const selectedTokenChangeCallback = useCallback(
            (token: any) => {
                return () => {
                    isDropdownShowChangeCallback();
                    setSelectedToken(token);
                };
            },
            [isDropdownShowChangeCallback],
        );

        return (
            <div className={CnInputToken()}>
                <div className={CnInputToken('base')}>
                    <div
                        // onClick={isDropdownShowChangeCallback}
                        className={CnInputToken('token')}
                    >
                        <div className={CnInputToken('token-img')}>
                            <img
                                src={selectedToken.logoURI}
                                alt={selectedToken.symbol}
                            />
                        </div>

                        <div className={CnInputToken('token-text')}>
                            <div className={CnInputToken('token-symbol')}>
                                {selectedToken.symbol}{' '}
                                {/* <Icons.AngleDown
                                    className={CnInputToken(
                                        'dropdownIndicator',
                                        {
                                            show: isDropdownShow,
                                        },
                                    )}
                                /> */}
                            </div>
                            <div className={CnInputToken('token-name')}>
                                {selectedToken.name}
                            </div>
                        </div>
                    </div>

                    <input {...props} className={CnInputToken('input')} />
                </div>

                <div
                    className={CnInputToken('dropdown', {
                        show: isDropdownShow,
                    })}
                >
                    {tokens.map((token) => {
                        return (
                            <div
                                key={token.address}
                                onClick={selectedTokenChangeCallback(token)}
                                className={CnInputToken('dropdownItem')}
                            >
                                <div
                                    className={CnInputToken(
                                        'dropdownItem-token',
                                    )}
                                >
                                    <div
                                        className={CnInputToken(
                                            'dropdownItem-image',
                                        )}
                                    >
                                        <img
                                            src={token.logoURI}
                                            alt={token.symbol}
                                        />
                                    </div>
                                    <div
                                        className={CnInputToken(
                                            'dropdownItem-name',
                                        )}
                                    >
                                        {token.name}
                                    </div>
                                </div>
                                <div
                                    className={CnInputToken(
                                        'dropdownItem-balance',
                                    )}
                                >
                                    {1000}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
);
