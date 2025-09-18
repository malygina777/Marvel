import { useState } from "react";
import useMarvelService from "../../services/MarvelService";

import { Formik } from "formik";
import * as Yup from "yup";
import "./charSearchForm.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const CharForm = () => {
  const { loading, error, clearError, getNameChar } = useMarvelService();
  const [char, setChar] = useState(null);

  const onCharLoader = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getNameChar(name).then(onCharLoader);
  };

  const errorMassage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{ inputValue: "" }}
        validationSchema={Yup.object({
          inputValue: Yup.string().required("This field is required "),
        })}
        onSubmit={(value) => updateChar(value.inputValue)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <label className="char__search-label" htmlFor="charName">
              Or find a character by name:
            </label>
            <div className="char__search-wrapper">
              <input
                value={values.inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="charName"
                name="inputValue"
              />

              <button
                className="button button__main"
                type="submit"
                disabled={loading}
              >
                <div className="inner">find</div>
              </button>
            </div>

            {char && !errors.inputValue ? (
              <div className="char__search-wrapper">
                <div className="char__search-success">
                  There is ! Visit {char.name}
                </div>
                <Link
                  to={`/${char.id}`}
                  state={{ valueName: values.inputValue }}
                  className="button button__secondary"
                >
                  <div className="inner">To page</div>
                </Link>
              </div>
            ) : (
              char !== null &&
              touched.inputValue &&
              values.inputValue && (
                <div className="char__search-error">
                  The caracter was not found. Check the name end try again
                </div>
              )
            )}

            {errors.inputValue && touched.inputValue ? (
              <div className="char__search-error">{errors.inputValue}</div>
            ) : null}
          </form>
        )}
      </Formik>
      {errorMassage}
    </div>
  );
};

export default CharForm;
