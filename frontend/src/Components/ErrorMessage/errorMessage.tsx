import './scss/errorMessage.scss';

type PropsType = {
  errorText: string;
};

export const ErrorMessage = ({ errorText }: PropsType) => {
    return errorText ? (
        <div className='errorMessageContainer' data-test='errorMessageComponent'>
            {errorText}
        </div>
    ) : <></>;
};
