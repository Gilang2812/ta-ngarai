  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.26,
        staggerDirection: -1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0,y:-10 },
    show: { opacity: 1,y:0, transition: { duration: 0.14 } },
    exit: { opacity: 0,y:-10, transition: { duration: 0.15 } },
  };

  export { containerVariants, itemVariants };