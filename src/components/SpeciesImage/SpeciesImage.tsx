import { Image } from 'expo-image';
import { styles } from './styles';

type SpeciesImageProps = {
  source: string;
};
export const SpeciesImage: React.FC<SpeciesImageProps> = ({ source }) => {
  return <Image style={styles.image} source={source}></Image>;
};
