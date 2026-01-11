import React from 'react';

interface ExclamationTriangleIconProps extends React.SVGProps<SVGSVGElement> {}

const ExclamationTriangleIcon: React.FC<ExclamationTriangleIconProps> = (props) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59C19.02 16.94 18.247 18 17.004 18H2.996C1.753 18 .98 16.94 1.739 14.69l6.518-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ExclamationTriangleIcon;
