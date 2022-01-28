import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

import * as prismicH from '@prismicio/helpers';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  console.log(post);
  return (
    <>
      <div className={styles.container}>
        <img src={post.data.banner.url} alt="Imagem do topo" />
        <div className={styles.content}>
          <h1>Criando um app CRA do zero</h1>
          <div className={styles.infos}>
            <span>
              <FiCalendar /> 15 Mar 2022
            </span>
            <span>
              <FiUser /> Lucas Barque
            </span>
            <span>
              <FiClock /> 4min
            </span>
          </div>
          <h2>Proin et varius</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit
            tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor
            sed.
          </p>
          <p>
            Ut venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>

          <h2>Cras laoreet mi</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit
            tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor
            sed.
          </p>
          <p>
            Ut venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, <a href="teste">tsete</a> elementum a posuere et,
            vulputate et erat. Nam venenatis.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query();

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('posts', String(slug), {});

  const post = response;

  return {
    props: {
      post,
    },
  };
};
