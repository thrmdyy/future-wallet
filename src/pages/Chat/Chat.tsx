import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { BaseLayout } from 'layout';
import { useAppDispatch } from 'hooks';
import { routerActions } from 'store';
import { routes } from 'consts';
import { Button, Input } from 'components';
import { Icons } from 'assets';
import { sendMessageToFuty } from 'api/chat';

import './Chat.scss';

const CnBaseLayout = cn('baseLayout');
const CnChat = cn('chat');

export const Chat: FC = memo(() => {
    const dispatch = useAppDispatch();

    const backClickCallback = useCallback(() => {
        dispatch(
            routerActions.navigate({
                path: routes.home,
            }),
        );
    }, [dispatch]);

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState<any>([]);

    const messageChangeCallback = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value);
        },
        [],
    );

    const sendMessage = useCallback(async (messages: any) => {
        const response = await sendMessageToFuty(messages);

        if (response) {
            setChat((prev: any) => [
                ...prev,
                { role: 'assistant', content: response },
            ]);
        }
    }, []);

    const submitMessageCallback = useCallback(async () => {
        if (!loading) {
            setLoading(true);
            const newMessage = { role: 'user', content: message };
            const newChat = [...chat, newMessage];

            setMessage('');

            setChat(newChat);

            await sendMessage(message);

            setLoading(false);
        }
    }, [message, sendMessage, chat, loading]);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                submitMessageCallback();
            }
        },
        [submitMessageCallback],
    );

    const messagesContent = useMemo(() => {
        if (!chat.length)
            return (
                <Message
                    key="hello message"
                    role="assistant"
                    content="Hello, I’m Futy! 👋 I’m your personal AI crypto assistant. How can I help you?"
                />
            );
        return chat.map((message: any, index: any) => {
            return <Message key={index} {...message} />;
        });
    }, [chat]);

    const loaderContent = useMemo(() => {
        if (!loading) return null;

        return <LoadingMessage />;
    }, [loading]);

    return (
        <div className={CnBaseLayout({}, 'chat')}>
            <div className={CnBaseLayout('header')}>
                <Button onClick={backClickCallback} view="icon">
                    <Icons.Back />
                </Button>

                <div className={CnChat('futy')}>
                    <div className={CnChat('futy-info')}>
                        <div className={CnChat('futy-name')}>Futy</div>
                        <div className={CnChat('futy-status')}>
                            Always active
                        </div>
                    </div>
                    <div className={CnChat('futy-avatar')}>
                        <Icons.Robot />
                    </div>
                </div>
            </div>
            <div className={CnBaseLayout('content')}>
                <div className={CnChat('content')}>
                    {messagesContent}
                    {loaderContent}
                </div>
                <div className={CnChat('actions')}>
                    <Input
                        onKeyDown={onKeyDown}
                        value={message}
                        onChange={messageChangeCallback}
                        placeholder="Ask your question"
                    />
                    <Button onClick={submitMessageCallback} view="dark-icon">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.11758 10.8258L6.84374 11.0134L6.11758 10.8258ZM10.784 6.43378L10.9253 7.17035L10.784 6.43378ZM13.5369 18.0581L13.3253 17.3386L13.5369 18.0581ZM15.0125 19.5338L14.293 19.3222L15.0125 19.5338ZM22.2448 26.9531L22.4324 27.6793L22.4324 27.6793L22.2448 26.9531ZM26.6369 22.2867L27.3735 22.4279L27.3735 22.4279L26.6369 22.2867ZM28.9764 10.0879L28.2398 9.94664L28.2398 9.94664L28.9764 10.0879ZM22.9827 4.09425L22.8415 3.35767L22.9827 4.09425ZM8.18371 23.8263C7.89082 24.1192 7.89082 24.5941 8.18371 24.887C8.47661 25.1799 8.95148 25.1799 9.24438 24.887L8.18371 23.8263ZM11.13 23.0013C11.4229 22.7084 11.4229 22.2336 11.13 21.9407C10.8371 21.6478 10.3622 21.6478 10.0693 21.9407L11.13 23.0013ZM9.12652 28.5403C8.83363 28.8332 8.83363 29.3081 9.12652 29.601C9.41942 29.8939 9.89429 29.8939 10.1872 29.601L9.12652 28.5403ZM12.0728 27.7154C12.3657 27.4225 12.3657 26.9476 12.0728 26.6547C11.7799 26.3618 11.305 26.3618 11.0121 26.6547L12.0728 27.7154ZM3.46967 22.8835C3.17678 23.1764 3.17678 23.6513 3.46967 23.9442C3.76256 24.237 4.23744 24.237 4.53033 23.9442L3.46967 22.8835ZM6.41595 22.0585C6.70884 21.7656 6.70884 21.2908 6.41595 20.9979C6.12306 20.705 5.64818 20.705 5.35529 20.9979L6.41595 22.0585ZM28.2398 9.94664L25.9003 22.1454L27.3735 22.4279L29.713 10.2292L28.2398 9.94664ZM10.9253 7.17035L23.124 4.83083L22.8415 3.35767L10.6427 5.6972L10.9253 7.17035ZM6.84374 11.0134C7.34972 9.05474 8.94308 7.5505 10.9253 7.17035L10.6427 5.6972C8.0866 6.18742 6.04121 8.12283 5.39142 10.6383L6.84374 11.0134ZM13.3253 17.3386C9.46594 18.4735 5.8326 14.9277 6.84374 11.0134L5.39142 10.6383C4.09393 15.661 8.75245 20.2469 13.7485 18.7777L13.3253 17.3386ZM15.732 19.7454C16.1649 18.2734 14.7973 16.9057 13.3253 17.3386L13.7485 18.7777C14.0815 18.6797 14.3909 18.9891 14.293 19.3222L15.732 19.7454ZM22.0572 26.2269C18.143 27.2381 14.5971 23.6047 15.732 19.7454L14.293 19.3222C12.8238 24.3182 17.4097 28.9768 22.4324 27.6793L22.0572 26.2269ZM25.9003 22.1454C25.5202 24.1276 24.0159 25.721 22.0572 26.2269L22.4324 27.6793C24.9479 27.0295 26.8833 24.9841 27.3735 22.4279L25.9003 22.1454ZM29.713 10.2292C30.4945 6.15391 26.9167 2.57611 22.8415 3.35767L23.124 4.83083C26.158 4.24895 28.8217 6.91262 28.2398 9.94664L29.713 10.2292ZM9.24438 24.887L11.13 23.0013L10.0693 21.9407L8.18371 23.8263L9.24438 24.887ZM10.1872 29.601L12.0728 27.7154L11.0121 26.6547L9.12652 28.5403L10.1872 29.601ZM4.53033 23.9442L6.41595 22.0585L5.35529 20.9979L3.46967 22.8835L4.53033 23.9442Z"
                                fill="#F2F4F5"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
});

const CnMessage = cn('chatMessage');

interface IMessageProps {
    role: 'user' | 'assistant';
    content: string;
}

const Message: FC<IMessageProps> = ({ role, content }) => {
    return (
        <div className={CnMessage({ type: role })}>
            {role === 'assistant' && (
                <div className={CnChat('futy-avatar', { small: true })}>
                    <Icons.Robot />
                </div>
            )}
            <div
                className={CnMessage('content')}
                dangerouslySetInnerHTML={{
                    __html: content.replaceAll('\n', '<br />') as any,
                }}
            ></div>
        </div>
    );
};

const LoadingMessage: FC = () => {
    return (
        <div className={CnMessage({ type: 'assistant', loader: true })}>
            <div className={CnChat('futy-avatar', { small: true })}>
                <Icons.Robot />
            </div>
            <div className={CnMessage('content')}>
                <Icons.Loader />
            </div>
        </div>
    );
};
