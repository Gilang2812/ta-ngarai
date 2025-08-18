"use client";
import Button from "@/components/common/Button";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import useToggleOpen from "@/hooks/useToggleOpen";
import { motion } from "framer-motion";
import { Plus, Store } from "lucide-react";
import React from "react";
import MarketplaceForm from "../marketplace/MarketplaceForm";

const NoStoreSection = () => {
  const { isOpen, toggle } = useToggleOpen();
  console.log(isOpen);
  return (
    <SingleContentWrapper>
      {!isOpen ? (
        <motion.div
          layout
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-8 flex flex-col items-center  text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Store className="w-12 h-12 text-gray-400" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              You Don't Have a Store Yet
            </h3>

            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              To start selling craft products and souvenirs from Nagari
              Koto Gadang, you need to create a store first. The store
              creation process is very easy and quick.
            </p>

            <Button onClick={toggle}>
              <Plus className="w-5 h-5 mr-2" />
              Create Store Now
            </Button>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                After creating a store, you can start adding products and
                managing orders
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div layout>
          <header className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Create Store
            </h2>
            <Button variant={"primary"} onClick={toggle}>
              Cancel
            </Button>
          </header>
          <MarketplaceForm toggle={toggle} />
        </motion.div>
      )}
    </SingleContentWrapper>
  );
};

export default NoStoreSection;
