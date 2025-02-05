import Image from 'next/image';

import LinkButton from '@/components/LinkButton';
import Skeleton from '@/components/Skeleton';

import styles from './index.module.css';

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,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CogKIIAlEAqUrNAqUrNArNWs0ErNWs0ErNWsVFSs1azQZrFarFFZrFatYtFZtc+q1a59VGoz1WC1EaARUVAEFQBWpWRYrtzW5XHmukrTNdZWpXOVqUZdJWpWJWpRG41KxKsojcq6zKsoNLrKg1q6zpoNGppoNDOgj0TU01GmtNZ00GtXWdNBrTWdXQa1dZ00RrV1nTQa1dZ00GtXWdXQXV1nTQa01nV0F01NBFNTTQXTU1NBdTTU0F1NTU0VUNZ0CpS1LQKzS1LQKzSs2gVmlSglYq2s1FSsVq1iipWLVtYtBLXO1q1jqjTHVcuq31XKo1BACoCDKoCpoqAaqsqK1G+a5xZWortK3K4810lGa6ytSucrUojpK1K5ytSiNytMSrojerrGroNaus6qi6usmoNaMgj0dNZ01GmtXWNXQa01nV0GtNZ1dBrV1jV0RrV1jV0GtXWdNBrV1nTQa1dZ00GtNZ1dBdNTTRF01NNBdNTU0F01NTQXU1NNA1NNTRS1m0tS0C1LS1m0C1m1bWbQS1m1bWbUVLWatrFoJazatrFoqWsWraxaKza59VrquXdRqM9VkqDQgDNQEVi0EFTVEA1oQRZWljKka1qV05rlGpcbV3lalcua3KMV0lalc5WpRHSVZWJVlEdNNZ1dBrV1nTQb01nTQa0Z0B6Oms6ayrWms6aDWrrOmg1q6zpoNaus6aI3prOroNausaug1q6xq6DWms6ug1prOmiNaammgumpqaDWms6aC6azpoLqammgammpoFqWpalopalpazaBazatrNoJazatrNqKlrNq2sWglrNq2sWipa59Vq1z6orPVcertb7rmjcQECiCK52iArIAAAAACqyosrUqs6sqxrW5XSVxalaV3lalcpWpRl1lalc5VlRHTV1jV0RvV1jV0GtNZ00GtGdAejprOmsK1q6xq6o1prOroNaazq6DWrrGrojWrrGroN6azpoN6azpoN6azpoNaus6aI1prOmg1prOmgumpqaDWpqaaC6mpqaC6mpqaC2palqWilqWlrNoFrNq2s2glrNq2s2oqWs2raxaKlrFq2sWip1XLqtdVy7o1GbdrIItRFZqsWlQFYAAAAAAAAAAFlQBuVdYlWVqVrXSVudOWrK0rvK1K4zpuVGXSVrXOVZRHTV1z1dBvTWdNBrRnQHo6ammuataazpoNausaug1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';

export const CardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Skeleton type="image" />
      </div>
      <Skeleton type="title" />
      <Skeleton type="linkButton" />
    </div>
  );
};

export const Card = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className={styles.container} data-testid="pet-card">
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={640}
          height={360}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          className={styles.image}
          sizes={'(max-width: 768px) 150px, 350px 100px'}
        />
      </div>
      <h3 className={`${styles.petName} h4`}>{name}</h3>
      <LinkButton href="https://coolblue.nl" title="View" />
    </div>
  );
};
