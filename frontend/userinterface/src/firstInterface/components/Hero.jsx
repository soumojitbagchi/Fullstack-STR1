import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Badge from './Badge';
import ThreeBackground from '../background/ThreeBackground';

/* ── Animation Variants ────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};
export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlerButton = () => {
    if (user) {
    
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 overflow-hidden font-sans">
      <ThreeBackground />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 text-center max-w-4xl w-full"
      >
        <Badge className="w-15"
          text={user ? `👋 Welcome back, ${user.name}` : '🛍️ NEW SEASON DROPS'}
          variants={itemVariants}
        />
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[0.95]"
        >
          {user ? (
            <>
              Your Style,{' '}
              <br />
              <span className="bg-gradient-to-r bg-white bg-clip-text text-transparent">
                Our collection
              </span>
            </>
          ) : (
            <>
              Discover What&apos;s{' '}
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Trending Now.
              </span>
            </>
          )}
        </motion.h1>
        <motion.button className='top-25 relative border-white shadow-white' onClick={handlerButton}>see more</motion.button>//todo : make that only registered users can see the preview ,others need to register first to see the product
      </motion.div>
    </section>
  );
}
