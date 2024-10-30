const Contact = require("../models/contactModel");
const { sendEmail } = require("../helper/sendEmail");

exports.store = async (req, res) => {
  try {
    const contact = await Contact.create(req.body); 
    res.json({ status: 200, message: "Contact Created Successfully", contact });
    // const subject = "Contact Us Query"
    // await sendEmail(contact.email, contact.message, subject)
  } catch (err) {
    console.log(err);
  }
};
// exports.index = async (req, res) => {
//     try {
//         const contacts = await Contact.find();
//         res.json({ status: 200, message: "Contacts Fetched Successfully", contacts })
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const contactsPerPage = 10;

    const totalContacts = await Contact.countDocuments();

    const from = (page - 1) * contactsPerPage + 1;
    const to = Math.min(from + contactsPerPage - 1, totalContacts);

    const contacts = await Contact.find()
      .sort({ updatedAt: -1 })
      .skip(contactsPerPage * (page - 1))
      .limit(contactsPerPage);
    const totalPages = Math.ceil(totalContacts / contactsPerPage);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      contacts,
      meta: {
        currentPage: page,
        totalPages,
        totalContacts,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.view = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const contactToDelete = await Contact.findById(id);

    if (!contactToDelete) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const contact = await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully", contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
