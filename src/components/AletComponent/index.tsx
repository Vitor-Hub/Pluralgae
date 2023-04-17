import { Alert, AlertColor, AlertTitle } from "@mui/lab";
import "./index.scss";

interface IProps {
  type: AlertColor;
  children: React.ReactNode;
}

const AlertComponent = (props: IProps) => {
  const { type, children } = props;

  return (
    <Alert className="AlertComponent" severity={type}>
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default AlertComponent;
