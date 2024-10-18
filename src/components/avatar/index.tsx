// ** React Imports
import { forwardRef } from 'react';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

interface AvatarProps {
  img?: string | boolean;
  size?: 'sm' | 'lg' | 'xl';
  icon?: React.ReactNode;
  color?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  badgeUp?: boolean;
  content?: string;
  tag?: keyof JSX.IntrinsicElements | React.ElementType;
  initials?: boolean;
  imgWidth?: string | number;
  className?: string;
  badgeText?: string;
  imgHeight?: string | number;
  badgeColor?: string;
  imgClassName?: string;
  contentStyles?: React.CSSProperties;
  [key: string]: any; // This allows for any other props that may be passed
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag = 'div', // Default prop
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str: string): string => {
    const results: string[] = [];
    const wordArray = str.split(' ');
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join('');
  };

  return (
    <Tag
      className={classnames('avatar', {
        [className!]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content!) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge color={badgeColor || 'primary'} className="badge-sm badge-up" pill>
              {badgeText || '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName!]: imgClassName,
          })}
          src={img as string}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </Tag>
  );
});

export default Avatar;

