import React, { CSSProperties } from "react";
import {
  MainLogo
} from "../../assets/icons/icons";

export class IconsMapping {
  mainLogo = MainLogo;

}

export type IconName = keyof IconsMapping;
const iconsMapping = new IconsMapping();

export type IconProps = {
  name: IconName;
  color?: string | null;
  strokeColor?: string | null;
  secondColor?: string | null;
  size?: number | string;
  onClick?: (e: any) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  style?: CSSProperties;
};

export const Icon = (props: IconProps) => {
  const CorrespondingIcon = iconsMapping[props.name];

  const style: CSSProperties = {
    ...props.style,
  };

  return CorrespondingIcon ? (
    <CorrespondingIcon
      onClick={props.onClick}
      strokeColor={props.strokeColor}
      size={props.size}
      color={props.color}
      style={style}
    />
  ) : null;
};
