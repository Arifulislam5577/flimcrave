import catchAsync from "express-async-handler";
import axios from "axios";
export const getMoviews = catchAsync(async (req, res) => {
  try {
    const { data } = await axios(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_API}`
    );

    if (data) {
      return res.status(200).json(data.results);
    }

    // return res.status(500).json({ message: "Internal Server Error" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const getMoviewByID = catchAsync(async (req, res) => {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.MOVIE_API}`
  );
  if (data) {
    return res.status(200).json(data);
  }

  return res.status(500).json({ message: "Internal Server Error" });
});
