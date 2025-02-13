interface ISpinnerProps {
  customStyle?: string;
}
const LoadingSpinner: React.FC<ISpinnerProps> = ({ customStyle, ...props }) => {
  return <div className={`loader ${customStyle} `} {...props}></div>;
};

export default LoadingSpinner;
