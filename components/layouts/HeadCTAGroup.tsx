import { FC } from "react";
import { CTAPlayDemoButton } from "../ui/buttons/CTAPlayDemoButton";
import { CTASignUpButton } from "../ui/buttons/CTASignUpButton";
import * as classNames from "classnames";

interface Props {
  styleName?: string;
}

export const HeadCTAGroup: FC<Props> = ({ styleName }) => {
  return (
    <div className={classNames.default("flex flex-row mx-auto gap-x-3", styleName)}>
      <CTAPlayDemoButton />
      <CTASignUpButton />
    </div>
  );
};