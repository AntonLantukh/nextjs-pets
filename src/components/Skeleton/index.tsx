import { cn } from '@/utils/cn';

import styles from './index.module.css';

const stylesDict = {
  image: styles.skeletonImage,
  title: styles.skeletonTitle,
  linkButton: styles.skeletonLinkButton,
};

const Skeleton = ({ type }: { type: 'image' | 'title' | 'linkButton' }) => {
  return <div className={cn([styles.skeleton, stylesDict[type]])} />;
};

export default Skeleton;
