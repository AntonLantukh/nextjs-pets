import styles from './index.module.css';

const cn = (classes: string[]) => classes.join(' ');

const stylesDict = {
  image: styles.skeletonImage,
  title: styles.skeletonTitle,
  linkButton: styles.skeletonLinkButton,
};

const Skeleton = ({ type }: { type: 'image' | 'title' | 'linkButton' }) => {
  return <div className={cn([styles.skeleton, stylesDict[type]])} />;
};

export default Skeleton;
