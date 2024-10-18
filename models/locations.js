import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  placeID: { type: String, required: true },
  locationType: { type: String, required: true },
});

countrySchema.index({placeID: 1})

export const Country = mongoose.model('Country', countrySchema);

