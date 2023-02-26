import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useGetSingleMovieQuery } from "../features/movile/movieSlice";

const SingleMovie = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const handleCreatePost = () => {
    setShowModal(true);
  };

  const { isLoading, data } = useGetSingleMovieQuery(id);

  if (isLoading) {
    return (
      <div className="container grid grid-cols-3 gap-5">
        <div className="col-span-2 h-96 bg-slate-800 rounded animate-pulse"></div>
        <div className="col-span-1 h-96 bg-slate-800 rounded animate-pulse"></div>
      </div>
    );
  }
  return (
    <section className="py-5">
      {showModal && <Modal id={id} setShowModal={setShowModal} />}
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2">
          <img
            src={`https://image.tmdb.org/t/p/original${
              data ? data?.backdrop_path : ""
            }`}
            alt={data ? data?.original_title : ""}
            className="rounded"
          />
        </div>

        <div className="col-span-1 text-white">
          <h2 className="text-2xl font-bold ">
            {data ? data?.original_title : ""}
          </h2>

          <p className="my-5">{data ? data?.overview : ""}</p>

          <div className="flex gap-3 my-3 flex-wrap">
            {data?.genres?.map((genra) => (
              <button
                className="text-sm px-4 py-2 border rounded-full"
                key={genra.id}
              >
                {genra.name}
              </button>
            ))}
          </div>

          <p>
            Rating{" "}
            <span className="text-orange-600 font-bold">
              {data?.vote_average}
            </span>{" "}
            from{" "}
            <span className="text-orange-600 font-bold">
              {data?.vote_count}
            </span>
          </p>

          <div className="my-5">
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 rounded-full border"
            >
              Share With Friends
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
